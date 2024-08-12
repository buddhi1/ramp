<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;

class JsontoExcelExport implements FromCollection,ShouldAutoSize, WithHeadings
{
    /**
     * @return \Illuminate\Support\Collection
     */
    protected $data;

    public function __construct(array $data)
    {
        $this->data = $data;
    }

    public function collection()
    {
        $collection = new Collection();

        foreach ($this->data as $trip) {
            $sensorData = [];

            foreach ($trip['sensor_data'] as $sensor => $values) {
                $sensorData[] = $sensor . ': ' . implode(', ', $values);
            }

            $collection->push([
                'trip_id' => $trip['trip_id'],
                'scooter_id' => $trip['scooter_id'],
                'rider_id' => $trip['rider_id'],
                'start_time' => $trip['start_time'],
                'end_time' => $trip['end_time'],
                'trip_distance' => $trip['trip_distance'],
                'avg_speed' => $trip['avg_speed'],
                'max_speed' => $trip['max_speed'],
                'min_speed' => $trip['min_speed'],
                'start_battery_status' => $trip['start_battery_status'],
                'end_battery_status' => $trip['end_battery_status'],
                'stops' => $trip['stops'],
                'video_link' => $trip['video_link'],
                'audio_link' => $trip['audio_link'],
                'sensor_data' => implode("\n", $sensorData)
            ]);
        }

        return $collection;

    }

    public function headings(): array
    {
        return [
            'Trip ID',
            'Scooter ID',
            'Rider ID',
            'Start Time',
            'End Time',
            'Trip Distance',
            'Avg Speed',
            'Max Speed',
            'Min Speed',
            'Start Battery Status',
            'End Battery Status',
            'Stops',
            'Video Link',
            'Audio Link',
            'Sensor Data'
        ];
    }
}
