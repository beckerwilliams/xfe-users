"""
This Illustrates Access to XFE-API for 3 Methods
    - /resolve  Get Passive DNS History for Indicator
    - /ipr      Get Full IPR Report for IP Indicator
    - /url      Get Full URL Report for URL Indicator (hosts or urls)

    (requires the python Requests package)

    Disclaimer: This file is for educational purposes only. Use at your own risk. No Warranty Expressed or Implied.
    Entitlement for access to IBM X-Force Exchange is the responsibility of the user, and must be obtained for
    examples to run.

"""
from json import dumps
from requests import get

__version__ = '1.0.1'
__date__ = '2020-04-18T18:14:01+0000'
__author__ = 'Ron Williams, Chief Architect, IBM X-Force Exchange'
__author_email__ = 'ron[.]williams@us[.]ibm[.]com'
__copyright__ = '2020 (C) Ron Williams, IBM. No Warranty Expressed or Implied. Use is at your own risk.'
__git_rev__ = 'c10edb0f05aacc579c72c4592dd5b2e8d151f044'

# Recommended Default HTTP Header Variables (to be used with Requests.get()
xfe_url = 'https://api.xforce.ibmcloud.com'
_xfe_headers = {'accept': 'application/json', 'content-type': 'application/json'}


def dns_history_for_ip(ip_address, creds):
    """
    XFE-API: /resolve
    Get Passive DNS History for IP

    :param ip_address:
    :param creds: string: '<api-key>.<api-pw>'
    :return: list
    """
    api = 'resolve'
    domain_data = get('/'.join((xfe_url, api, ip_address)),
                      headers=_xfe_headers,
                      auth=tuple(creds.split(':'))).json()  # <- 'Requests' Has a .json Method

    # Aggregate individual passive dns records for ip
    notes = []
    for rec in domain_data['Passive']['records']:
        if not rec:
            break
        notes.append(rec)
    return notes


def url_record(url_string, creds):
    """
    XFE-API: /url

    :param url_string: string: '[http(s)://]host:port/path?query#fragment'
    :param creds: string: '<api-key>.<api-pw>'
    :return: dict
    """
    api = 'url'
    resp = get('/'.join((xfe_url, api, url_string)),
               headers=_xfe_headers,
               auth=tuple(creds.split(':'))).json()  # <- 'Requests' Has a .json method

    if 'result' in resp:
        return resp['result']
    else:
        return {'error': 'Not Found'}


def ip_record(ip_address, creds):
    """
    XFE_API: /ipr
    Get FULL IP Report for IP (w/ Current PDNS)

    :param ip_address:
    :param creds: api_keys: '<api-key>:<api-pw>'
    :return:  dict: IPR Report (JSON)
    """
    api = 'ipr'
    return get('/'.join((xfe_url, api, ip_address)),
               headers=_xfe_headers,
               auth=tuple(creds.split(':'))).json()  # <- 'Requests' Has a .json method


if __name__ == '__main__':
    """
        Set xfe-api keys here, as concatenated string, 
        with ':' between user part (or api-key) and password part (or api-pw)
        should look something like: '<api-key>:<api-pw>'
    """
    # api_keys = '<api-key>:<api-pw>'
    from os import environ  # Alternatively, this is a useful technique for local testing
    api_keys = environ['xauth']  # `export xauth=<api-key:api-pw>`, or `setenv xauth $api-key:$api-pw`

    # Get PDNS Records for IP from /resolve
    ip = '1.2.3.4'
    dns_records = dns_history_for_ip(ip, api_keys)

    # Example: Aggregate PDNS Records and print """
    dns_text = ''
    print("DNS Records for IP: %s" % ip)
    # a simple python Format for DNS Records (dict)
    pdns_fmt = 'domain: {value}, type: {type}, recordType: {recordType}, last: {last}, first: {first}\n'

    # Gather and Print Each Record
    for record in dns_records:
        if record and 'value' in record:
            print(pdns_fmt.format_map(record))
            """ str.format_map(mapping)
                Similar to str.format(**mapping), except that mapping is used directly and not copied to a dict.
                This is useful if the example mapping is a dict (json object)"""

    """ Instead of JUST Passive DNS for IP, Get Complete IPR w/ LATEST PDNS for IP """
    ip_report = ip_record(ip, api_keys)
    """ You Can Extract the Elements You need Here, 
        Or Cache These results (Full IPR w/ categorizaton history, or URLs (no history) Records)
        You may augment IPR records you cache w/ Passive DNS by obtaining /resolve for the IP
        The full record contains the CURRENT PDNS HISTORY for IP from rec
    """
    if 'error' not in ip_report:
        print(dumps(ip_report, indent=4))
    else:
        print("IP: <%s>: Not Found" % ip)

    # And an example URL
    url = 'http://netflix-covid-19.com'
    url_report = url_record(url, api_keys)
    print("Illustrating Existing Indicator")
    if 'error' not in url_report:
        print(dumps(url_report, indent=4))
    else:
        print("URL: <%s>: %s" % (url, url_report['error']))

    """ And an URL which Won't Be Found  """
    url = 'https://funky-url-that-wont-be-found.blat'
    url_report = url_record(url, api_keys)
    if 'error' not in url_report:
        print(dumps(url_report, indent=4))
    else:
        print("Illustrating Indicator Not Found on XF:\nURL: <%s>: %s" % (url, url_report['error']))
