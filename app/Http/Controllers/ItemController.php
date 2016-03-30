<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Http\Requests\ItemRequest;
use App\Models\Item;

class ItemController extends Controller
{
    public function index(Request $request, $cid)
    {
        try {
            return Item::where('conference_id', $cid)->get();
        } catch (Exception $e) {
            return response()->error();
        }
    }

    public function store(ItemRequest $request)
    {
        try {
            Item::create($request->all());
            return response()->success();
        } catch (Exception $e) {
            return response()->error();
        }
    }

    public function show(ItemRequest $request, $cid, $iid)
    {
        try {
            $item = Item::find($id);
            if (!$item) {
                return response()->error(404);
            }
            return $item;
        } catch (Exception $e) {
            return response()->error();
        }
    }

    public function update(ItemRequest $request, $cid, $iid)
    {
        try {
            $item = Item::find($id);
            if (!$item) {
                return response()->error(404);
            }
            $item->update($request->all());
            return response()->success();
        } catch (Exception $e) {
            return response()->error();
        }
    }

    public function destroy(ItemRequest $request, $cid, $iid)
    {
        try {
            $item = Item::find($id);
            if (!$item) {
                return response()->error(404);
            }
            $item->delete();
            return response()->success();
        } catch (Exception $e) {
            return response()->error();
        }
    }
}
