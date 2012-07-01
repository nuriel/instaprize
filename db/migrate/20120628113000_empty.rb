class Empty < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.integer :vote_index
      t.text :comment

      t.timestamps
    end
    
    add_index :votes, :vote_index
    
  end
end