class CreateContests < ActiveRecord::Migration
  def change
    create_table :contests do |t|
      t.string :title
      t.integer :current_state
      t.integer :current_picture
      t.string :current_picture_instagram

      t.timestamps
    end

  end
end
