class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.string :instagram_id
      t.string :title
      t.string :uploader_id
      t.string :url
      t.string :thumb_url
      t.boolean :voted, default: false

      t.timestamps
    end
    add_index :pictures, :instagram_id
  end
end
