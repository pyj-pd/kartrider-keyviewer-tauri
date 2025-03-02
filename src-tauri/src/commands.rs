use font_kit::source::SystemSource;
use tauri::{Emitter, Manager};


#[tauri::command]
pub  fn get_font_family_list() -> Vec<String> {
    let font_source = SystemSource::new();
    font_source.all_families().unwrap().into()
}

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
pub fn update_config(app: tauri::AppHandle, from: String) {
    app.emit("config-updated", from).unwrap();
}

#[tauri::command]
pub fn update_template(app: tauri::AppHandle, from: String) {
    app.emit("template-updated", from).unwrap();
}