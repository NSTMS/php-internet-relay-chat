<?php
   // Connect to Memcache
   $memcache = new Memcache;
   $memcache->connect('localhost', 11211);

   // Continuously check for new messages
   while (true) {
       // Check if there are new messages in Memcache
       $messages = $memcache->get('messages');
       if ($messages) {
           // Respond to the client with the new messages
           echo $messages;
           flush();

           // Remove the messages from Memcache
           $memcache->delete('messages');
           exit;
       }

       // Sleep for a short period before checking again
       usleep(100000); // 100 milliseconds
   }
   ?>
