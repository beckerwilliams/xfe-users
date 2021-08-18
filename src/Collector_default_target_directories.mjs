#!/user/bin/env node
// <FILE>
// author: ron williams
// email: ron.williams@infosecglobal.com
// date: 02.08.2021
import path from 'path/posix'

/***
 *
 * @type {{win32: string[], freebsd: string[], darwin: string[]}}
 */
const scan_fs_target_defaults = {
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
}

const default_target_directories = (() => {

    let scan_fs_targets = []

    // Handle Files Provided by Windows ENVIRONMENT
    const add_windows_default_entries = () => {
        ["ProgramData", "Program Files", "Program Files (x86)", "windir"].forEach((win32_env_var, idx) => {
            if (win32_env_var in process.env)
                scan_fs_targets.push(path.win32.normalize(process.env[win32_env_var]))
        })
    }

    (new Set(scan_fs_target_defaults[process.platform])).forEach((pathname, idx) => {
        // Load Target Array. For Windows. Add SystemDrive File PATH
        if (process.platform === "win32")
            scan_fs_targets[idx] = path.win32.join(process.env["SystemDrive"], pathname)
        else  // For all others, normalize to POSIX Path ( import path/posix)
            scan_fs_targets[idx] = path.normalize(pathname)
    })

    if (process.platform === "win32") add_windows_default_entries()

    return scan_fs_targets

})()

export default default_target_directories

// console.log(default_target_directories)
