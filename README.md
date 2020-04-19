xfe-api-examples.py
------------
Working Illustration of Simple X-Force API Access and Use
=========================================================
Illustrates Access to XFE-API using api-keys and 3 Methods
----------------------------------------------------------

X-Force Exchange API Documentation

[/resolve:  Get Passive DNS History for Indicator](https://api.xforce.ibmcloud.com/doc/#!/DNS/get_resolve_input)

[/ipr:      Get Full IPR Report for IP Indicator](https://api.xforce.ibmcloud.com/doc/#!/IP_Reputation/get_ipr_ip)

[/url:      Get Full URL Report for URL Indicator (hosts or urls)](https://github.com/beckerwilliams/xfe-users)


author
------

Ron Williams, Chief Architect, IBM X-Force Exchange,
ron[.]williams@us[.]ibm[.]com, 
[@linkedin](https://www.linkedin.com/in/rbwilliams)

Getting Started
===============
    Requirement
    a. From your chosen Python Environment, install Requests 2.23.0 (or higher)
        pip install requests

Configuraton (Install API Keys) i.e. api_keys = '<api-key>:<api-pw>'
------------------------------------------------------------------
    1. Open xfe-users/scripts/xfe-examples.py
    2. Replace <API-KEY>:<API-PW> w/ your API-KEY and API-PW, with separting colong ':' character between
       api_keys = '<API-KEY>:<API-PW>'

Run Script
----------
    From ./xfe-users type:
        python scripts/xfe-api-examples.py
      
Notes
------
When the Response from the Requests module is accompanied by 'Content-Type': 'application/json',
the object returned  contains a json() method which returns the **data** portion of the response in JSON format.
With Requests, this technique is preferable to loading the raw data content and converting with json.loads

    Example
    r = Request.get(...)
    return r.json()
    
    Short Cut:
    return Request.get(...).json()
    
Requirements:

    Requests (>=2.23.0) Package
    
Terms and Conditions
--------------------
    Your use of this file constitutes your agreement with the followings Terms and Condidtions.
    Specifically, you agree that:
    - This file is for educational purposes only. 
    - You will use this file at your own risk.
    - This file provides No Warranty, Expressed or Implied.
    - You may copy, delete, modify, disseminate, and  include this file or any element of this file in any work product you desire.
    - You agree to fully indemnify the Copyright holder from any claims, material or otherwise
    with respect to the your use of this file and/or any of it's contents.
    - YOur use of this file Does Not provide or constitute authorized entitlement to the X-Force Exchange API
    - Entitlement to use X-Force Exchange API must be otained separately by the user.

repo: https://github.com/beckerwilliams/xfe-users
Copyright (c) 2020, Ron Williams. All Rights Reserved.

