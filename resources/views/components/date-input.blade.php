@props(['disabled' => false, 'defaultValue' => null])

<?php
$formattedDefaultValue = null;
if ($defaultValue !== null) {
    // Convert epoch timestamp to DateTime object
    $epoch = intval($defaultValue) / 1000;
    $dateTime = new DateTime("@$epoch", new DateTimeZone('UTC'));
    $timeZone = new DateTimeZone('America/Chicago');
    $dateTime->setTimeZone($timeZone);
    // Format DateTime object in the desired format
    $formattedDefaultValue = $dateTime->format('Y-m-d\TH:i');
}
?>

<input type="datetime-local" value="{{ $formattedDefaultValue ?? '' }}" {{ $disabled ? 'disabled' : '' }} {!! $attributes->merge(['class' => 'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm']) !!}>
