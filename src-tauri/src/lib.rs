use rdev::{listen, EventType};
use tauri::{Emitter, Manager};

#[tauri::command]
async fn open_settings(app: tauri::AppHandle) {
    if let Some(settings_window) = app.get_webview_window("settings") {
        // Focus if already open
        settings_window.show().unwrap();
        settings_window.unminimize().unwrap();
        settings_window.set_focus().unwrap();
    } else {
        // Create window if not open
        tauri::WebviewWindowBuilder::from_config(
            &app,
            &app.config().app.windows.get(1).unwrap().clone()
        )
        .unwrap()
        .build()
        .unwrap();
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .setup(|app| {
            let main_window = app.get_webview_window("keyviewer").unwrap();

            // Send keystrokes to main window
            tauri::async_runtime::spawn(async move {
                listen(move |event| {
                    let (event_type, pressed_key) = match event.event_type {
                        EventType::KeyPress(key) => ("keypress", format!("{:?}", key)),
                        EventType::KeyRelease(key) => ("keyrelease", format!("{:?}", key)),
                        _ => return,
                    };

                    let _ = main_window.emit(event_type, pressed_key);
                })
                .unwrap();
            });

            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![open_settings])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
