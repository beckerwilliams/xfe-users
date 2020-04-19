[xfe-api-examples.py](https://github.com/beckerwilliams/xfe-users)
---------------------
X-Force API Access and Use
===================================================

Example APIs
-------------------------------------
- [/resolve:  Get Passive DNS History for Indicator](https://api.xforce.ibmcloud.com/doc/#!/DNS/get_resolve_input)

- [/ipr:      Get Full IPR Report for IP Indicator](https://api.xforce.ibmcloud.com/doc/#!/IP_Reputation/get_ipr_ip)

- [/url:      Get Full URL Report for URL Indicator (hosts or urls)](https://github.com/beckerwilliams/xfe-users)

packages required

- Python Requests Package (>=2.23.0)

author

- Ron Williams, Chief Architect, IBM X-Force Exchange,
ron[.]williams@us[.]ibm[.]com, 
[@linkedin](https://www.linkedin.com/in/rbwilliams)

Getting Started
---------------

### Configuration (Install API Keys)

#### Simple Method

1. Open xfe-users/scripts/xfe-examples.py
2. Replace 
    - `<API-KEY>:<API-PW>`
    
    w/ your API-KEY and API-PW, 
    
    - `api_keys = '<API-KEY>:<API-PW>'`
       
#### Alternative Method
    
1. Set Api-Key in Environment

    Bourne Shell or BASH
    - `export xauth='<api-key>:<api-pw>'`
    
    C Shell
    - `setenv xauth '{api-key}:{api-pw}'`
   
2. Comment out the first line below (at the beginning of __main__)

    - `api_keys = '<api-key>:<api-pw>'` 
    
    to    
     
    - `#api_keys = '<api-key>:<api-pw>'`

3. Uncomment the next two lines:
    
        #from os import environ  # Alternatively, this is a useful technique for local testing
        #api_keys = environ['xauth']  # `export xauth=<api-key:api-pw>`, or `setenv xauth $api-key:$api-pw'
    
    to
    
        from os import environ  # Alternatively, this is a useful technique for local testing.
        api_keys = environ['xauth']  # export xauth=<api-key:api-pw> 

        
After editing to enable, the Alternative eliminates the need to edit the script to set, update, or delete chosen API-KEYs.

### Run Script
    From ./xfe-users type:
        python scripts/xfe-api-examples.py
            
#### Tips on Using the `Request`s Module

- The `Request`'s Response object contains a method, `(self.)json()`, which will return the data as a JSON Object
(Python `dict`). 

- This method is valid if the Response Header's `Content-Type` field is `application/json`.

- This technique is preferable to loading the raw data content and converting the raw data with `json.loads(resp.content)`

    #### Example

    ##### When the response headers contain `{"Content-Type": "*.json"}" `,  Always use Request's `json()` Response method.
        
        def ip_record(ip_address, creds):
            api = 'ipr'
            return get('/'.join((xfe_url, api, ip_address)),
                       headers=_xfe_headers,
                       auth=tuple(creds.split(':'))).json()  # <- 'Requests' Has a .json() method
                                                    ^^^^^^^

    ##### This approach is Unnecessary if `json()` employed.
    
        def ip_record(ip_address, creds):
            api = 'ipr'
            resp = get('/'.join((xfe_url, api, ip_address)),
                       headers=_xfe_headers,
                       auth=tuple(creds.split(':')))
            return loads(resp.content)
            ^^^^^^^^^^^^^^^^^^^^^^^^^^ (resp.json() performs this natively!)                      

Obtaining Authorized Access to the X-Force Exchange Commercial API
------------------------------------------------------------------
- [Free IBM User Registration (Obtain IBM Id)](https://www.ibm.com/account/reg/us-en/signup?formid=urx-30243)
    
How to generate and use X-Force Exchange API Keys:
  - [X-Force Exchange - First Time Login and API-KEY Generattion](https://www.youtube.com/watch?v=3ZtYl4t5asc)
    
Free Trials and Paid Offerings to X-Force Exchange Commercial API    
  - [X-Force Exchange Commercial API Offerings and Trials: X-Force Exchange Commercial API (Try/Buy)](https://www.ibm.com/products/ibm-xforce-exchange/editions)

Terms and Conditions
====================

- This package and it's contents are for educational purposes only. 
- Use at your own risk, no warranty is expressed or implied.
- The user of this package is solely responsible for obtaining IBM Authorized Entitlement to use the X-Force Exchange API. 
- Use of this package DOES NOT constitute authorized access to the X-Force Exchange or it's services.
- The User of this package will indemnify and save harmless the author of this package against any and all claims 
  against the User that result from the User's' employment of this package, it's files, it's code elements, and/or other 
  information contained herein.

Copyright (c) 2020, Ron Williams. All Rights Reserved.
