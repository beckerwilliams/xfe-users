'use strict'
import path from 'path/posix'


/**
 *
 * @type {{win32: string[], freebsd: string[], darwin: string[], linux: string[]}}
 */
const os_dirs_default = {
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

export const collection_dirs_default = (() => {

    let collection_dirs = []

    // Handle Files Provided by Windows ENVIRONMENT
    const add_windows_default_entries = () => {
        ["ProgramData", "Program Files", "Program Files (x86)", "windir"].forEach((win32_env_var) => {
            if (win32_env_var in process.env)
                collection_dirs.push(path.win32.normalize(process.env[win32_env_var]))
        })
    }

    (new Set(os_dirs_default[process.platform])).forEach((pathname, idx) => {

        // Load Target Array. For Windows. Add SystemDrive File PATH
        if (process.platform === "win32")
            collection_dirs[idx] = path.win32.join(process.env["SystemDrive"], pathname)
        else  // For all others, normalize to POSIX Path ( import path/posix)
            collection_dirs[idx] = path.normalize(pathname)
    })
    if (process.platform === "win32") add_windows_default_entries()
    return collection_dirs
})()
