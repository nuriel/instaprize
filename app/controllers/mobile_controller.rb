class MobileController < ApplicationController
  respond_to :js, :html
  
  def index
    @vote = Vote.new()
    
    # get state
    # if in "voting mode" set voting flag to true
    # get current voting and last votes
  end
  
  def nexu
    
    uid = request.session_options[:id]

    # send vote get reply
    # if succ
      # if vote up add points
      # " " down take points
  end
end
