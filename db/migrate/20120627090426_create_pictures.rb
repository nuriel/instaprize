class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.string :title
      t.string :user
      t.string :url
      t.string :thumb_url
      t.boolean :voted, default: false

      t.timestamps
    end
  end
end
