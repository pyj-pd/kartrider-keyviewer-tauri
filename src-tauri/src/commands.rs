use tauri::{Emitter, LogicalSize, Manager, Size};

#[tauri::command]
pub async fn open_settings(app: tauri::AppHandle) {
    if let Some(settings_window) = app.get_webview_window("settings") {
        // Focus if already open
        settings_window.show().unwrap();
        settings_window.unminimize().unwrap();
        settings_window.set_focus().unwrap();
    } else {
        // Create window if not open
        tauri::WebviewWindowBuilder::from_config(
            &app,
            &app.config().app.windows.get(1).unwrap().clone(),
        )
        .unwrap()
        .build()
        .unwrap();
    }
}

#[tauri::command]
pub async fn set_keyviewer_always_on_top(app: tauri::AppHandle, always_on_top: bool) {
    if let Some(keyviewer_window) = app.get_webview_window("keyviewer") {
        keyviewer_window.set_always_on_top(always_on_top).unwrap();
    }
}

#[tauri::command]
pub async fn set_keyviewer_window_size(app: tauri::AppHandle, width: f64, height: f64) {
    if let Some(keyviewer_window) = app.get_webview_window("keyviewer") {
        keyviewer_window
            .set_size(Size::Logical(LogicalSize { width, height }))
            .unwrap();
    }
}

#[tauri::command]
pub fn update_config(app: tauri::AppHandle, from: String) {
    app.emit("config-updated", from).unwrap();
}