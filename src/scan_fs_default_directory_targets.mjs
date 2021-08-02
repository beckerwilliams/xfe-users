#!/user/bin/env node
// <FILE>
// author: ron williams
// email: ron.williams@infosecglobal.com
// date: 02.08.2021
import path from 'path/win32';

/***
 *
 * @type {{win32: string[], freebsd: string[], darwin: string[]}}
 */
const fs_scan_target_defaults = {
    "darwin":
        [
            "/System", "/Library", "/Applications",
            "/bin", "/sbin", "/lib", "/etc",
            "/usr/bin", "/usr/sbin", "/usr/lib",
            "/usr/local/bin", "/usr/local/sbin", "/usr/local/lib", "/usr/local/etc",
            "/opt", "/opt/bin", "/opt/lib", "/opt/etc",
            "/usr/local/opt/bin", "/usr/local/opt/sbin", "/usr/local/opt/lib", "/usr/local/opt/etc"
        ],
    "win32":  // Standard FORWARD (/) Slashes. Converted to Win32 Format {drive:\full_pathname}
        ["/Scripts"],
    "freebsd":
        [
            "${HOME}",
            "/bin", "/sbin", "/lib", "/etc",
            "/usr/bin", "/usr/sbin", "/usr/lib",
            "/usr/local/bin", "/usr/local/sbin", "/usr/local/lib", "/usr/local/etc",
            "/opt", "/opt/bin", "/opt/lib", "/opt/etc",
            "/usr/local/opt/bin", "/usr/local/opt/sbin", "/usr/local/opt/lib", "/usr/local/opt/etc"
        ],
    "linux": [
        "/bin", "/sbin", "/lib", "/etc",
        "/usr/bin", "/usr/sbin", "/usr/lib",
        "/usr/local/bin", "/usr/local/sbin", "/usr/local/lib", "/usr/local/etc",
        "/opt", "/opt/bin", "/opt/lib", "/opt/etc",
        "/usr/local/opt/bin", "/usr/local/opt/sbin", "/usr/local/opt/lib", "/usr/local/opt/etc"
    ]
};
const fs_scan_default_directory_targets = (() => {
    let targets = [];
    // if (true) {
    if (process.platform === 'win32') {
        // Get windows Paths - Attach to %SYSTEMDRIVE%
        fs_scan_target_defaults[process.platform].forEach((pathname, idx) => {
            targets[idx] = path.join(process.env['SystemDrive'], pathname); // Add System Drive to Entries
        });
        if ('ProgramData' in process.env)
            targets.push(process.env['ProgramData']);
        if ('Program Files' in process.env)
            targets.push(process.env['Program Files']);
        if ('Program Files (x86)' in process.env)
            targets.push(process.env['Program Files (x86)']);
        if ('windir' in process.env)
            targets.push(process.env["windir"]);
    } else {
        targets = fs_scan_target_defaults[process.platform]
    }
    // Return Unique Values
    return targets;
})();
export default fs_scan_default_directory_targets;
