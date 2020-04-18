"""
This Illustrates Access to XFE-API for 3 Methods
    - /resolve  Get Passive DNS History for Indicator
    - /ipr      Get Full IPR Report for IP Indicator
    - /url      Get Full URL Report for URL Indicator (hosts or urls)

    (requires the python Requests package)

    - Ron Williams, Chief Architect, IBM X-Force Exchange
    - ron[.]williams@us[.]ibm[.]com

    Disclaimer: This file is for educational purposes only. Use at your own risk. No Warranty Expressed or Implied.
    Entitlement for access to IBM X-Force Exchange is the responsibility of the user, and must be obtained for
    examples to run.

"""
from json import dumps
from requests import get

xfe_url = 'https://api.xforce.ibmcloud.com'
_xfe_headers = {'accept': 'application/json', 'content-type': 'application/json'}
"""
    Set xfe-api keys here, as concatenated string, 
    with ':' between user part (or api-key) and password part (or api-pw)
    should look something like: '<api-key>:<api-pw>'
"""
from os import environ
api_key = environ['xauth']  # A Simple Way to make creds available to unattended process
# api_key = '<api-key>:<api-pw>'


def dns_history_for_ip(ip):
    """
    XFE-API: /resolve
    Get Passive DNS History for IP

    :param ip:
    :return: list
    """
    # API: /resolv
    api = 'resolve'
    domain_data = get('/'.join((xfe_url, api, ip)),
                      headers=_xfe_headers,
                      auth=tuple(api_key.split(':'))).json()  # <- 'Requests' Has a .json Method
    # Aggregate individual passive dns records for ip
    notes = []
    for record in domain_data['Passive']['records']:
        if not record:
            break
        notes.append(record)
    return notes


def url_record(url):
    """
    XFE-API: /url
    :param url:
    :return: dict
    """
    # API: /ipr
    api = 'url'
    resp = get('/'.join((xfe_url, api, url)),
               headers=_xfe_headers,
               auth=tuple(api_key.split(':'))).json()
    if 'result' in resp:
        return resp['result']
    else:
        return {'error': 'Not Found'}


def ip_record(ip):
    """
    XFE_API: /ipr
    Get FULL IP Report for IP (w/ Current PDNS)

    :param ip:
    :return: dict
    """
    # API: /ipr
    api = 'ipr'
    return get('/'.join((xfe_url, api, ip)),
               headers=_xfe_headers,
               auth=tuple(api_key.split(':'))).json()  # <- 'Requests' Has a .json


if __name__ == '__main__':

    # Get PDNS Records for IP from /resolve
    ip = '1.2.3.4'
    dns_records = dns_history_for_ip(ip)

    # a simple python Format for DNS Records (dict)
    pdns_fmt = 'domain: {value}, type: {type}, recordType: {recordType}, last: {last}, first: {first}\n'

    # Example: Aggregate PDNS Records and print
    dns_text = ''
    print("DNS Records for IP: %s" % ip)
    for record in dns_records:
        if record and 'value' in record:
            print(pdns_fmt.format_map(record))
    """ str.format_map(mapping)
        Similar to str.format(**mapping), except that mapping is used directly and not copied to a dict. T
        his is useful if the example mapping is a dict (json object)
    """

    # Instead of JUST Passive DNS for IP, Get Complete IPR w/ LATEST PDNS for IP
    rec = ip_record(ip)
    """ You Can Extract the Elements You need Here, 
        Or Cache These results (Full IPR w/ categorizaton history, or URLs (no history) Records) 
        
        The full record contains the CURRENT PDNS for IP
            @ rec["""
    if 'error' not in rec:
        print(dumps(ip_record(ip), indent=4))
    else:
        print("IP: <%s>: Not Found" % ip)

    # And an example URL
    url = 'http://netflix-covid-19.com'
    rec = url_record(url)
    if 'error' not in rec:
        print(dumps(rec, indent=4))
    else:
        print("URL: <%s>: %s" % (url, rec['error']))

    # And an URL which Won't Be Found
    url = 'https://funky-url-that-wont-be-found.blat'
    rec = url_record(url)
    if 'error' not in rec:
        print(dumps(rec, indent=4))
    else:
        print("URL: <%s>: %s" % (url, rec['error']))