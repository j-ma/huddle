<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Http\Requests\RoomRequest;

use App\Models\Accommodation;
use App\Models\Room;

class RoomController extends Controller
{
    public function index(RoomRequest $request, $accommodation)
    {
        try {
            return Room::where('accommodation_id', $accommodation)->get();
        } catch (Exception $e) {
            return response()->error();
        }
    }

    public function store(RoomRequest $request)
    {
        try {
            $accommodation = Accommodation::find($request->accommodation_id);
            $room = new Room($request->all());
            $room->accommodation()->associate($accommodation);
            $room->save();
            return response()->success();
        } catch (Exception $e) {
            return response()->error();
        }
    }

    public function update(RoomRequest $request, $accommodation, $id)
    {
        try {
            $room = Room::find($id);
            if (!$room) {
                return response()->error("No Room Found");
            }
            $room->update($request->all());
            return response()->success();
        } catch (Exception $e) {
            return response()->error();
        }
    }

    public function destroy(RoomRequest $request, $accommodation, $id)
    {
        try {
            $room = Room::find($id);
            if (!$room) {
                return response()->error("No Room Found");
            }
            if($room->guests()->count() > 0) {
                return response()->error("There are still guests in this room");
            }
            $room->delete();
            return response()->success();
        } catch (Exception $e) {
            return response()->error();
        }
    }
}
