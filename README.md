
## Globe Connect for CLI

### Setting Up

```npm install -g globe-connect-cli```

### Authentication

#### Overview

If you haven't signed up yet, please follow the instructions found in [Getting Started](http://www.globelabs.com.ph/docs/#getting-started-create-an-app) to obtain an `App ID` and `App Secret` these tokens will be used to validate most of your interaction requests with the Globe APIs.

    The authenication process follows the protocols of **OAuth 2.0**. The example code below shows how you can swap your app tokens for an access token.

#### Sample Code

```bash
Authentication is not available in Globe Connect CLI.
```

#### Sample Results

```json
{
    "access_token":"1ixLbltjWkzwqLMXT-8UF-UQeKRma0hOOWFA6o91oXw",
    "subscriber_number":"9171234567"
}
```

### SMS

#### Overview

Short Message Service (SMS) enables your application or service to send and receive secure, targeted text messages and alerts to your Globe / TM subscribers.

        Note: All API calls must include the access_token as one of the Universal Resource Identifier (URI) parameters.

#### SMS Sending

Send an SMS message to one or more mobile terminals:

##### Sample Code

```bash
globe-connect sms -a [subscriber_number] -m "[message]" -s [short_code] -c [client_correlator] -t "[access_token]"
```

##### Sample Results

```json
{
    "outboundSMSMessageRequest": {
        "address": "tel:+639175595283",
        "deliveryInfoList": {
            "deliveryInfo": [],
            "resourceURL": "https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/8011/requests?access_token=3YM8xurK_IPdhvX4OUWXQljcHTIPgQDdTESLXDIes4g"
        },
        "senderAddress": "8011",
        "outboundSMSTextMessage": {
            "message": "Hello World"
        },
        "receiptRequest": {
            "notifyURL": "http://test-sms1.herokuapp.com/callback",
            "callbackData": null,
            "senderName": null,
            "resourceURL": "https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/8011/requests?access_token=3YM8xurK_IPdhvX4OUWXQljcHTIPgQDdTESLXDIes4g"
        }
    }
}
```

#### SMS Binary

Send binary data through SMS:

##### Sample Code

```bash
globe-connect binarysms -c "[short_code]" -t "[access_token]" -u "[data_header]" -d [coding_scheme] -a "[subscriber_number]" -m "[message]" --verbose
```

##### Sample Results

```json
{
    "outboundBinaryMessageRequest": {
        "address": "9171234567",
        "deliveryInfoList": {
            "deliveryInfo": [],
            "resourceURL": "https://devapi.globelabs.com.ph/binarymessaging/v1/outbound/{senderAddress}/requests?access_token={access_token}",
        "senderAddress": "21581234",
        "userDataHeader": "06050423F423F4",
        "dataCodingScheme": 1,
        "outboundBinaryMessage": {
            "message": "samplebinarymessage"
        },
        "receiptRequest": {
          "notifyURL": "http://example.com/notify",
          "callbackData": null,
          "senderName": null
        },
        "resourceURL": "https://devapi.globelabs.com.ph/binarymessaging/v1/outbound/{senderAddress}/requests?access_token={access_token}"
    }
}
```

### USSD

#### Overview

USSD are basic features built on most smart phones which allows the phone owner to interact with menu item choices.

#### USSD Sending

The following example shows how to send a USSD request.

##### Sample Code

```bash
globe-connect ussd-send -m [message] -a [address] -s [short_code] -f [flash] -t [access_token]
```

##### Sample Results

```json
{
    "outboundUSSDMessageRequest": {
        "address": "639954895489",
        "deliveryInfoList": {
            "deliveryInfo": [],
            "resourceURL": "https://devapi.globelabs.com.ph/ussd/v1/outbound/21589996/reply/requests?access_token=access_token"
        },
        "senderAddress": "21580001",
        "outboundUSSDMessage": {
            "message": "Simple USSD Message\nOption - 1\nOption - 2"
        },
        "receiptRequest": {
            "ussdNotifyURL": "http://example.com/notify",
            "sessionID": "012345678912"
        },
        "resourceURL": "https://devapi.globelabs.com.ph/ussd/v1/outbound/21589996/reply/requests?access_token=access_token"
    }
}
```

#### USSD Replying

The following example shows how to send a USSD reply.

##### Sample Code

```bash
globe-connect ussd-send -m [message] -a [address] -s [short_code] -f [flash] -t [access_token] -i [session_id]
```

##### Sample Results

```json
{
    "outboundUSSDMessageRequest": {
        "address": "639954895489",
        "deliveryInfoList": {
            "deliveryInfo": [],
            "resourceURL": "https://devapi.globelabs.com.ph/ussd/v1/outbound/21589996/reply/requests?access_token=access_token"
        },
        "senderAddress": "21580001",
        "outboundUSSDMessage": {
            "message": "Simple USSD Message\nOption - 1\nOption - 2"
        },
        "receiptRequest": {
            "ussdNotifyURL": "http://example.com/notify",
            "sessionID": "012345678912",
            "referenceID": "f7b61b82054e4b5e"
        },
        "resourceURL": "https://devapi.globelabs.com.ph/ussd/v1/outbound/21589996/reply/requests?access_token=access_token"
    }
}
```

### Payment

#### Overview

Your application can monetize services from customer's phone load by sending a payment request to the customer, in which they can opt to accept.

#### Payment Requests

The following example shows how you can request for a payment from a customer.

##### Sample Code

```bash
globe-connect payment -a [amount] -d "[description]" -e [subscriber_number] -r [reference] -s [status] -t "[access_token]" --verbose
```

##### Sample Results

```json
{
    "amountTransaction":
    {
        "endUserId": "9171234567",
        "paymentAmount":
        {
            "chargingInformation":
            {
                "amount": "0.00",
                "currency": "PHP",
                "description": "my application"
            },
            "totalAmountCharged": "0.00"
        },
        "referenceCode": "12341000023",
        "serverReferenceCode": "528f5369b390e16a62000006",
        "resourceURL": null
    }
}
```

#### Payment Last Reference

The following example shows how you can get the last reference of payment.

##### Sample Code

```bash
globe-connect get-last-reference -ai "[app_id]" -as "[app_secret]" --verbose
```

##### Sample Results

```json
{
    "referenceCode": "12341000005",
    "status": "SUCCESS",
    "shortcode": "21581234"
}
```

### Amax

#### Overview

Amax is an automated promo builder you can use with your app to award customers with certain globe perks.

#### Sample Code

```bash
globe-cli.js amax -i "[app_id]" -s "[app_secret]" -t "[rewards_token]" -p "[promo]" -a [subscriber_number] --verbose
```

#### Sample Results

```json
{
    "outboundRewardRequest": {
        "transaction_id": 566,
        "status": "Please check your AMAX URL for status",
        "address": "9065272450",
        "promo": "FREE10MB"
    }
}
```

### Location

#### Overview

To determine a general area (lat,lng) of your customers you can utilize this feature.

#### Sample Code

```bash
globe-connect location -a [subscriber_number] -c [accuracy] -t "[access_token]" --verbose
```

#### Sample Results

```json
{
    "terminalLocationList": {
        "terminalLocation": {
            "address": "tel:9171234567",
            "currentLocation": {
                "accuracy": 100,
                "latitude": "14.5609722",
                "longitude": "121.0193394",
                "map_url": "http://maps.google.com/maps?z=17&t=m&q=loc:14.5609722+121.0193394",
                "timestamp": "Fri Jun 06 2014 09:25:15 GMT+0000 (UTC)"
            },
            "locationRetrievalStatus": "Retrieved"
        }
    }
}
```

### Subscriber

#### Overview

Subscriber Data Query API interface allows a Web application to query the customer profile of an end user who is the customer of a mobile network operator.

#### Subscriber Balance

The following example shows how you can get the subscriber balance.

##### Sample Code

```bash
globe-connect subscr-bal -a [subscriber_number] -t "[access_token]" --verbose
```

##### Sample Results

```json
{
    "terminalLocationList":
    {
        "terminalLocation":
        [
            {
                address: "639171234567",
                subBalance: "60200"
            }
        ]
    }
}
```

#### Subscriber Reload

The following example shows how you can get the subscriber reload amount.

##### Sample Code

```bash
globe-connect subscr-reload-amt -a [subscriber_number] -t "[access_token]" --verbose
```

##### Sample Results

```json
{
    "terminalLocationList":
    {
        "terminalLocation":
        [
            {
                address: "639171234567",
                reloadAmount: "30000"
            }
        ]
    }
}
```
