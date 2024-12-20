<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'google2fa_secret'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function assignRole($role)
    {
        return $this->roles()->save($role);
    }

    public function isAdmin()
    {
        // Check if the role is already set (saved during login or via middleware)
        if (isset($this->role)) {
            return $this->role->name === 'ADMIN';
        }

        // Optionally, use session if the role was stored there
        return session('user_role') === 'ADMIN';
    }

    public function roles()
    {
        return $this->belongstoMany(Role::class);
    }

    // protected function google2faSecret(): Attribute {
    //     return new Attribute(
    //         get: fn ($value): mixed => decrypt(value: $value),
    //         set: fn ($value): string => encrypt(value: $value)
    //     );
    // }
}
