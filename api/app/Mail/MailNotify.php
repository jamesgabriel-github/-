<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class MailNotify extends Mailable
{
    use Queueable, SerializesModels;

    private $data = [];
    /**
     * Create a new message instance.
     */
    public function __construct($data)
    {
        //
        $this->data = $data;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Mail Notify',
        );
    }

    /**
     * Get the message content definition.
     */
    // public function content(): Content
    // {
    //     return new Content(
    //         $this->from('test@example.org', 'test send email')
    //     ->subject($this->data['subject'])
    //     ->view('emails.index')->with('data', $this->data)
    //     );
    //     // return $this->from('test@example.org', 'test send email')
    //     // ->subject($this->data['subject'])
    //     // ->view('emails.index')->with('data', $this->data);
    // }
    public function build(){
        return $this->from('test@example.org', 'test send email')
        ->subject($this->data['subject'])
        ->view('emails.index')->with('data', $this->data);
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
