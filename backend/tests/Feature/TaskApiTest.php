<?php

namespace Tests\Feature;

use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_can_create_a_task(): void
    {
        $payload = [
            'title' => 'Mulkat case hazirla',
            'description' => 'Backend ve frontend gelistirme',
            'status' => 'todo',
            'priority' => 'high',
        ];

        $response = $this->postJson('/api/tasks', $payload);

        $response
            ->assertCreated()
            ->assertJsonPath('data.title', 'Mulkat case hazirla');

        $this->assertDatabaseHas('tasks', [
            'title' => 'Mulkat case hazirla',
            'status' => 'todo',
            'priority' => 'high',
        ]);
    }

    public function test_it_can_filter_tasks_by_status_and_priority(): void
    {
        Task::factory()->create([
            'title' => 'Task 1',
            'status' => 'todo',
            'priority' => 'low',
        ]);
        Task::factory()->create([
            'title' => 'Task 2',
            'status' => 'done',
            'priority' => 'high',
        ]);

        $response = $this->getJson('/api/tasks?status=done&priority=high');

        $response
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.title', 'Task 2');
    }
}
