require 'test_helper'

class ScreenControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

  test "should get resault" do
    get :resault
    assert_response :success
  end

end
