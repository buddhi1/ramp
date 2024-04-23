<!-- resources/views/components/table.blade.php -->

@props(['data' => [], 'headers' => []])
<div class="rounded">
<table class="items-center bg-transparent w-full border-collapse">
    <thead>
        <tr>
            @foreach ($headers as $header)
                <th class="bg-gray-100 px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-md uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">{{ $header }}</th>
            @endforeach
        </tr>
    </thead>
    <tbody>
    <tr>
        @forelse ($data as $row)
            <tr>
                @foreach ($row as $cell)
                    <td class="border-t-0 px-6 align-center border-l-0 border-r-0 whitespace-nowrap p-4">{!! $cell !!}</td>
                @endforeach
            </tr>
        @empty
            <tr>
                <td class="px-4 py-2 border" colspan="{{ count($headers) }}">No data available</td>
            </tr>
        @endforelse
    </tbody>
</table>
</div>
