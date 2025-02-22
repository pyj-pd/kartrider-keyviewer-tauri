use rdev::{listen, EventType};
use tauri::{Emitter, Manager};

#[tauri::command]
fn open_settings(app: tauri::AppHandle) {
    if app.get_webview_window("settings").is_none() {
        tauri::WebviewWindowBuilder::new(
            &app,
            "settings",
            tauri::WebviewUrl::App("/#settings".into()),
        )
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
