<!-- resources/views/components/table.blade.php -->

@props(['data' => [], 'headers' => []])

<table class="min-w-full bg-white border-gray-300">
    <thead>
        <tr>
            @foreach ($headers as $header)
                <th class="py-2 px-4 text-left">{{ $header }}</th>
            @endforeach
        </tr>
    </thead>
    <tbody>
    <tr>
        @forelse ($data as $row)
            <tr>
                @foreach ($row as $cell)
                    <td class="py-2 px-4 border">{!! $cell !!}</td>
                @endforeach
            </tr>
        @empty
            <tr>
                <td class="py-4 px-4 text-center" colspan="{{ count($headers) }}">No data available</td>
            </tr>
        @endforelse
    </tbody>
</table>
