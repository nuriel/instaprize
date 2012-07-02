# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120701230014) do

  create_table "contests", :force => true do |t|
    t.string   "title"
    t.integer  "current_state"
    t.integer  "current_picture"
    t.string   "current_picture_instagram"
    t.datetime "created_at",                :null => false
    t.datetime "updated_at",                :null => false
  end

  create_table "pictures", :force => true do |t|
    t.string   "instagram_id"
    t.string   "title"
    t.string   "uploader_id"
    t.string   "url"
    t.string   "thumb_url"
    t.boolean  "voted",        :default => false
    t.datetime "created_at",                      :null => false
    t.datetime "updated_at",                      :null => false
  end

  add_index "pictures", ["instagram_id"], :name => "index_pictures_on_instagram_id"

  create_table "votes", :force => true do |t|
    t.integer  "vote_index"
    t.text     "comment"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "votes", ["vote_index"], :name => "index_votes_on_vote_index"

end
