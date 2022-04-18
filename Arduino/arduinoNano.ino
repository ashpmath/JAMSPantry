#include <ArduinoBLE.h>
#include <Arduino_HTS221.h>
#include <Arduino_LSM9DS1.h>
#include "HX711.h"
#include "TimeoutTimer.h"
#define BUFSIZE 20
#define DOUT  3
#define CLK  2

/*   We'll use the ArduinoBLE library to simulate a basic UART connection 
 *   following this UART service specification by Nordic Semiconductors. 
 *   More: https://learn.adafruit.com/introducing-adafruit-ble-bluetooth-low-energy-friend/uart-service
 */
BLEService uartService("6E400001-B5A3-F393-E0A9-E50E24DCCA9E");
BLEStringCharacteristic txChar("6E400002-B5A3-F393-E0A9-E50E24DCCA9E", BLEWrite, 20 );
BLEStringCharacteristic rxChar("6E400003-B5A3-F393-E0A9-E50E24DCCA9E", BLERead | BLENotify, 20 );

/*  Create a Environmental Sensing Service (ESS) and a 
 *  characteristic for its temperature value.
 */
BLEService essService("181A");
BLEShortCharacteristic tempChar("2A6E", BLERead | BLENotify );
BLEShortCharacteristic humChar("2A6F", BLERead | BLENotify );
BLEShortCharacteristic weightChar("2A9E", BLEREAD | BLENotify ); // weight measurement scale, may need to change when testing.

// Weight Sensor
HX711 scale(DOUT, CLK);   //intialzize scale - DOUT is connected to digital pin 3 and clock is connected to pin 2 on nano

float temp = 0.0;
float hum = 0.0;
int interval = 100; //changed this 
float weight = 0.0; //weight sensors
float calibration_factor = -96650; // calibration factor

void setup() 
{
  Serial.begin(9600);
  Serial.println("Press T to tare");    
  scale.set_scale(calibration_factor);  //Calibration Factor obtained from first sketch
  scale.tare();                         //Reset the scale to 0 
  
  while(!Serial);
  if (!HTS.begin()) {
    Serial.println("Failed to initialize humidity temperature sensor!");
    while (1);
  }
  if ( !BLE.begin() )
  {
    Serial.println("Starting BLE failed!");
    while(1);
  }

  // Get the Arduino's BT address
  String deviceAddress = BLE.address();

  // The device name we'll advertise with.
  BLE.setLocalName("ArduinoBLE Lab3");

  // Get UART service ready.
  BLE.setAdvertisedService( uartService );
  uartService.addCharacteristic( txChar );
  uartService.addCharacteristic( rxChar );
  BLE.addService( uartService );

  // Get ESS service ready.
  essService.addCharacteristic( tempChar );
  //BLE.addService( essService );
  essService.addCharacteristic( humChar );
  BLE.addService( essService );

  // Start advertising our new service.
  BLE.advertise();
  Serial.println("Bluetooth device (" + deviceAddress + ") active, waiting for connections...");
}

void loop() 
{

  Serial.print("Weight: ");
  Serial.print(scale.get_units(), 3);  //Up to 3 decimal points
  Serial.println(" kg");

  if(Serial.available())
  {
    char t = Serial.read();
    if(t == 't' || t == 'T')
      scale.tare();  //Reset the scale to zero      
  }
  
  // Wait for a BLE central device.
  BLEDevice central = BLE.central();

  // If a central device is connected to the peripheral...
  if (central)
  {
    // Print the central's BT address.
    Serial.print("Connected to central: ");
    Serial.println( central.address() );
    
    // While the central device is connected...
    while( central.connected() )
    {
      // Get input from user, send to central
      char inputs[BUFSIZE+1];
      if ( getUserInput( inputs, BUFSIZE ) )
      {
        Serial.print("[Send] ");
        Serial.println( inputs );
        rxChar.writeValue( inputs );
      }

      // Receive data from central (if written is true)
      if ( txChar.written() )
      {
        Serial.print("[Recv] ");
        Serial.println( txChar.value() );

        int test =(txChar.value().toInt())*1000;
         if (test != 0)
        {
            interval = (txChar.value().toInt())*1000;
            Serial.print("delay changed to: ");
            Serial.println(interval);
        }
      }

      /* 
       *  Emit temperature per ESS' tempChar.
       *  Per the characteristic spec, temp should be in Celsius 
       *  with a resolution of 0.01 degrees. It should also 
       *  be carried within short.
      */
      // Get temperature (random for sample code)
      //float temp = random( 0, 60 ) / 2.5;

      // TODO: Get temperature from Arduino sensor (per Lab 1)
      temp = HTS.readTemperature();
      hum = HTS.readHumidity();
      weight = scale.getWeight();

      if( weight != 0 ){
        float fullMass = 100.0;
        float noMass = 0.0;

        totalPercentage = (weight/fullMass)*100;

      }
      else{
        println("Error - NO MASS");
      }
      //temp = round((HTS.readTemperature())*100.0);
      
      Serial.print("Temp: ");
      Serial.println(temp);
      Serial.print("Hum: ");
      Serial.print(hum);
      Serial.print("Container Capacity (%): ");
      Serial.println(totalPercentage);

      // Cast to desired format; multiply by 100 to keep desired precision.
      short shortTemp = (short) (temp * 100);
      short shortHum = (short) (hum * 100);
      short shortWeight = (short) (totalPercentage * 100); 

      // Send data to centeral for temperature characteristic.
      tempChar.writeValue( shortTemp );
      humChar.writeValue( shortHum );
      weightChar.writeValue( shortWeight );

      Serial.println(interval);
      delay(interval);
    }
    Serial.print("Disconnected from central: ");
    Serial.println( central.address() );
}
  } //end of if

/**************************************************************************/
/*!
    @brief  Checks for user input (via the Serial Monitor)
            From: https://github.com/adafruit/Adafruit_BluefruitLE_nRF51
*/
/**************************************************************************/
bool getUserInput(char buffer[], uint8_t maxSize)
{
  // timeout in 100 milliseconds
  TimeoutTimer timeout(100);

  memset(buffer, 0, maxSize);
  while( (!Serial.available()) && !timeout.expired() ) { delay(1); }

  if ( timeout.expired() ) return false;

  delay(2);
  uint8_t count=0;
  do
  {
    count += Serial.readBytes(buffer+count, maxSize);
    delay(2);
  } while( (count < maxSize) && (Serial.available()) );
  
  return true;
}
