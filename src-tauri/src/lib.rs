use tauri::{menu::MenuBuilder, Emitter, Manager};
use rdev::{listen, EventType};

fn open_settings(app: &tauri::AppHandle) {
  if app.get_webview_window("settings").is_none() {
    tauri::WebviewWindowBuilder::new(app, "settings", tauri::WebviewUrl::App("/#settings".into()))
      .build()
      .unwrap();
  }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .setup(|app| {
      let main_window = app.get_webview_window("keyviewer").unwrap();

      // Set window menu
      let menu = MenuBuilder::new(app)
        .text("open-settings", "설정")
        .build()?;

      main_window.set_menu(menu)?;

      app.on_menu_event(move |app_handle, event| {
        match event.id().0.as_str() {
          "open-settings" => {
            // Open settings window
            open_settings(app_handle);
          },
          _ => {},
        }
      });
      
      // Send keystrokes to main window
      tauri::async_runtime::spawn(async move {
        listen(move |event| {
          let (event_type, pressed_key) = match event.event_type {
            EventType::KeyPress(key) => ("keypress", format!("{:?}", key)),
            EventType::KeyRelease(key) => ("keyrelease", format!("{:?}", key)),
            _ => return,
          };

          let _ = main_window.emit(event_type, pressed_key);
        }).unwrap();
      });
      
      Ok(())
    })
    .plugin(tauri_plugin_opener::init())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
