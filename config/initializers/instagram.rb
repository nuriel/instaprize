require "instagram"

Instagram.configure do |config|
  config.client_id = "d5ab3dbdab184ea19ccef2d30d656cce"
  config.client_secret = "9c6e74c74cc64c2ca372bfbd12a00989"
end

CALLBACK_URL = "http://www.instaprize.me/session/callback"