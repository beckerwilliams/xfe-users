'use strict'
// Flattens nodejs X509Certificate object
// todo write tests
export default class TlsSocketInfo {
    constructor(tls_socket) {
        this.address = tls_socket.address
        this.authorized = tls_socket.authorized
        this.encrypted = tls_socket.encrypted
        this.peerCertificateChain = tls_socket.getPeerCertificate(true)
        this.peerX509Certificate = tls_socket.getPeerX509Certificate()
        this.tlsProtocol = tls_socket.getProtocol()
        this.getSharedSignatureAlgorithms = tls_socket.getSharedSigalgs()
        this.TLSTicket = tls_socket.getTLSTicket()
        this.localAddress = tls_socket.localAddress
        this.localPort = tls_socket.localPort
        this.remoteAdderess = tls_socket.remoteAddress
        this.remotePort = tls_socket.remotePort
        this.remoteFamily = tls_socket.remoteFamily

        // Get Cipher Being Used
        let _cipher = tls_socket.getCipher()
        this.CipherName = _cipher.name
        this.CipherStandardName = _cipher.standardName
        this.CipherVersion = this._cipher.version

        // Get Ephemeral Socket Key Data
        let _ephemeralKeyInfo = tls_socket.getEphemeralKeyInfo()
        this.ephemeralKeyInfoType = _ephemeralKeyInfo.type
        this.ephemeralKeyInfoName = _ephemeralKeyInfo.name
        this.ephemeralKeyInfoSize = _ephemeralKeyInfo.size
    }
}

// Test
