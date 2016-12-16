# Globe Connect for CLI

## Introduction
Globe Connect for CLI provides an implementation of Globe APIs e.g Authentication, Amax,
Sms etc. via CLI (Command Line Tool) that can be used as a standalone tool without the need
to build a fully functional app, this tool is useful if you wanted to test the APIs functionality
and see the result as quick as possible.

## Basic Usage

###### Figure 1. Amax

```sh
globe-cli.js amax -i "[app_id]" -s "[app_secret]" -t "[rewards_token]" -p "[promo]" -a "[+63 subscriber_number]" --verbose
```

###### Figure 2. Binary SMS

```sh
globe-connect binarysms -c "[short_code]" -t "[access_token]" -u "[header]" -d 1 -a "[+63 subscriber_number]" -m "[message]" --verbose
```

###### Figure 3. Location

```sh
globe-connect location -a "[+63 subscriber_number]" -c [accuracy] -t "[access_token]" --verbose
```

###### Figure 4. Payment (Send Payment Request)

```sh
globe-connect payment -a "[amount]" -d "[description]" -e "[+63 subscriber_number]" -r 41301000206 -s Charged -t "[access_token]" --verbose
```

###### Figure 5. Payment (Get Last Reference ID)

```sh
globe-connect get-last-reference -ai "[app_id]" -as "[app_secret]" --verbose
```

###### Figure 6. Sms

```sh
globe-connect sms -a "[+63 subscriber_number]" -m "[message]" -s "[short_code]" -c "[client_correlator]" -t "[access_token]"
```

###### Figure 7. Subscriber (Get Balance)

```sh
globe-connect subscr-bal -a "[+63 subscriber_number]" -t "[access_token]" --verbose
```

###### Figure 8. Subscriber (Get Reload Amount)

```sh
globe-connect subscr-reload-amt -a "[+63 subscriber_number]" -t "[access_token]" --verbose
```

###### Figure 9. USSD (Send)

```sh
globe-connect ussd-send -m "[message]" -a "[+63 subscriber_number]" -s "[short_code]" -f false -t "[access_token]"
```

###### Figure 10. USSD (Reply)

```sh
globe-connect ussd-send -m "message" -a ""[+63 subscriber_number]"" -s "[short_code]" -f false -t "[access_token]" -i "[session_id]"
```
