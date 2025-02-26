mod commands;

use rdev::{listen, EventType};
use tauri::{Emitter, Manager};

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
        .invoke_handler(tauri::generate_handler![
            commands::open_settings,
            commands::set_keyviewer_always_on_top,
            commands::set_keyviewer_window_size,
            commands::update_config,
            commands::update_template,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
