---
layout: post
title: 'Game Web Cast Project: Game Components'
date: 2012-06-29 09:26:00
tags: [2d tutorial, game development, xna]
---


### This section is pretty much as-is from the original Digipen webcast.  View the [original video for the webcast here](http://startrooper2dxna.codeplex.com/releases/view/43706 "Original lesson three webcast and supporting documentation") on codeplex.

* * *


### 1. Graphics


### 1.1. Two-Dimensional Graphics

2D graphics are the computer-based generation of digital images mostly from two-dimensional models (2D geometric models, text, and digital images). These graphics are mainly used in applications that were originally developed using traditional printing and drawing techniques, such as typography, cartography, technical drafting, advertising, and so forth. In many domains, a description of a document based on 2D computer graphic techniques (vector-based), can be much smaller than the corresponding digital image – often by a factor of 1/1000 or more. This representation is also more flexible since it can be rendered at different resolutions to suit specific output devices. 2D computer graphics started with vector-based graphic devices. In the following decades, bitmap-based devices largely supplanted these.


### 1.2. Three-Dimensional Graphics

3D graphics are works of graphic art that are created using the aid of digital computers and specialized 3D software. In general, the art of 3D graphics is similar to sculpting and photography, while the art of 2D graphics is similar to painting. In computer graphics software, this distinction is occasionally blurred; some 2D applications use 3D techniques to achieve certain effects, such as lighting, while some primarily 3D applications make use of 2D visual techniques. These graphics are distinct from 2D computer graphics in that a three-dimensional virtual representation of the game objects is stored in the computer for the purposes of performing calculations and rendering images.

| In 3D graphics, an object moves freely on the three axes.

The orientation can be over the x, y and z-axis.

The rotation along the x-axis is called pitch, along the y-axis yaw, and along the z-axis roll.

 | [![image](/assets/img/wordpress/2012/07/image5.png "image")](/assets/img/wordpress/2012/07/image5.png) |

|   |   |
| For example, in a flight simulation, the plane can pitch, yaw, and roll. |
| [![image](/assets/img/wordpress/2012/07/image6.png "image")](/assets/img/wordpress/2012/07/image6.png) |


### 1.3. Bitmap-Based Graphics

A bitmap graphic image is a data file or structure representing a generally rectangular grid of pixels, or points of colour, on a computer monitor or other display device. The colour of each pixel is individually defined; images in the RGB colour space often consist of coloured pixels defined by three bytes (one byte each for red, green, and blue colour values). Less colourful images require less information per pixel. For example, an image with black and white pixels only requires a single bit for each pixel.

Bitmap graphics are different from vector graphics in that vector graphics represent an image using geometric objects such as curves and polygons. Instead, a bitmap corresponds bit to bit with an image displayed on a screen, probably in the same format as it would be stored in the display’s video memory. A bitmap is characterized by the width and height of the image in pixels and the number of bits per pixel, which determines the number of colours it can represent.

The total number of pixels (resolution) and amount of information in each pixel (colour depth) determines the quality of a bitmap image. For example, an image that stores 24 bits of colour information per pixel can represent smoother degrees of shading than one that only stores 16 bits per pixel, but not as smooth as one that stores 48 bits. Likewise, an image sampled at 640×480 pixels (containing 307,200 pixels) will look rough and blocky compared to one sampled at 1280×1024 (1,310,720 pixels).

Storing a high-quality image requires a large amount of data; that is why data compression techniques are often used to reduce the size of images stored on disk. Bitmap graphics cannot be scaled to a higher or lower resolution without a loss of noticeable quality. Bitmap graphics are more practical than vector graphics for photographs and photo-realistic images.


### 1.4. Vector-Based Graphics

Vector graphics use geometrical primitives such as points, lines, curves, and polygons to represent images.

These graphics are often more practical for typesetting or graphic design like text, logos, and diagrams. Vector graphics easily scale to the quality of the device on which they are rendered and therefore allow for much more precise control and resizing of the image.

* * *


### 2. Input


### 2.1. Keyboards

[![image](/assets/img/wordpress/2012/07/image7.png "image")](/assets/img/wordpress/2012/07/image7.png)

The keyboard is an input device with systematically arranged keys that allow users to type information, move the cursor, or activate functions assigned to keys. The keys on computer keyboards are often classified as follows:

- Alphanumeric keys: Letters and numbers to enter data.
- Punctuation keys: Comma, period, semicolon, and so on.
- Special keys: Function keys, control keys, arrow keys, Caps Lock key, and so on.

In a game, the keyboard is used to enter text or data, to move objects, to access objects’ behaviours, to load, and to save the game.


### 2.2. Mouse

[![image](/assets/img/wordpress/2012/07/image8.png "image")](/assets/img/wordpress/2012/07/image8.png)

A mouse is a small object, which is rolled along a hard, flat surface. Mouse devices control the movement of the cursor or pointer on a display screen. As you move the mouse, the pointer on the display screen moves in the same direction. The mouse is used to move game objects and to shoot. The mouse frees users to a large extent from using the keyboard. In particular, the mouse is important for graphical user interfaces (GUI) because users can simply point to options and objects and click a mouse button to select that option. The mouse is also useful for graphics programs that allow users to draw images by using the mouse like a pen, pencil, or paintbrush.


### 2.3. Joystick

[![image](/assets/img/wordpress/2012/07/image9.png "image")](/assets/img/wordpress/2012/07/image9.png)

A joystick is a pointing device consisting of a hand-held stick that pivots about one end and transmits its angle in two or three dimensions to a computer. Most joysticks are two-dimensional, having two axes of movement, just like a mouse, but three-dimensional joysticks do exist. Joysticks are often used to control games, and usually have one or more push-buttons whose state can also be read by the computer and often set by the user. An analogue joystick is a joystick that has continuous states – it returns an angle measure of the movement in any direction in the plane or the space. A digital joystick gives only on/off signals for four different directions and mechanically possible combinations (such as up-right, down-left, etc). Digital joysticks are very common as game controllers for video game consoles. Joysticks often have one or more fire buttons, used to trigger some kind of action which is visible on the screen. These are digital.


### 2.4. Force Feedback with Input Devices

Some input devices are capable of responding to force feedback, the pushing or resisting forced that a joystick exerts on a player, for example. The force is the push or resistance. Particular forces create specific effects for which a game is programmed. Effects can be categorized as follows:

- Constant force: A force in a single direction.
- Ramp force: A force that increases or decreases in magnitude.
- Periodic effect: A force that pulsates according to a defined wave pattern.
- Condition: A reaction to motion or position along an axis.

For example, a friction effect generates resistance to the movement of the joystick. The direction can be defined for the x-, y-, and z-axes. As with the joystick, the x-axis increases from left to right (-←  →+) and the y-axis increases from far to near (-↓  +↑). For example, an effect with a direction along the negative y-axis (-↓) tends to push the stick toward users along the y-axis.

The magnitude is the strength of the force. It is measured in units starting from 0 (no force) until 10,000 (the maximum force). A negative value indicates that the force is in the opposite direction. The duration of an effect is measured in microseconds. Periodic effects have a period (the duration of one cycle), which is also measured in microseconds. The phase of a periodic effect is the point at which the playback begins.

| 

[![image](/assets/img/wordpress/2012/07/image10.png "image")](/assets/img/wordpress/2012/07/image10.png)

 |
| A sawtooth periodic effect with a magnitude of 5,000, or half the maximum force for the device. |

The Force Editor application offers the ability to design force-feedback effects and test them singly or in combination. Effects can be saved to file and then loaded into applications.

* * *


### 3. Sounds


### 3.1. Introduction

Sound and music always play a major role in games. Designers depend on sound and music to give players audio feedback, in addition to graphic feedback. Along with all the improvement in hardware technology, audio has also improved. Nowadays, various audio technologies exist, such as compressed, uncompressed, three-dimensional and interactive audio. Game programmers often adjust between compressed and uncompressed audio formats, depending on the bottleneck in their data-loading pipeline. Game programmers change their decisions according to whether the load should be on the CPU (resources-decompressing audio at run time) or the hard-drive/CDROM/DVD where uncompressed file sizes can be10 to 20 times the size of a compressed file.


### 3.2. Uncompressed Audio Format

> ### 3.2.1. WAV File Format

> WAV File Format is a file format for storing digital audio (waveform) data. A WAV file is characterized by the file extension ‘.wav.’ This music file format provides raw, uncompressed audio data. This format is widely used in professional programs that process digital audio waveforms. Audio quality is excellent, but file sizes can be very large. A full pop song in WAV format may take up to 40 MB of disk space or more.
> 
> Note: we can find a compressed (.wav) wave file format.
> 
> When building games for XNA, WAV is still the only supported audio file format as compressed file formats such as **MP3 are not supported** by either XNA or XACT (Microsoft Cross-Platform Audio Creation Tool).  This is not great but at least the content pipeline compresses the audio a bit when storing but not much.  The biggest content likely to be in your game is audio.

> ### 3.2.2. MIDI (Musical Instrument Digital Interface)
> 
> The MIDI file format was originally created for recording and playing music on digital synthesizers. MIDI files are very small in size. The reason for this is that the MIDI file only contains information on how music is produced (e.g. note-ons and note-offs …). The sound card, which plays back the MIDI file, takes this information and plays back music using a built-in soundcard wave-table (waves stored in the sound card’s ROM).


### 3.3. Compressed Audio Format

> ### 3.3.1. MP3
> 
> MP3, short for MPEG-1/MPEG-2 Layer 3, is a format for storing digital audio. It uses an advanced type of audio compression, which reduces the file size (usually 1/12 of the original file size) with little reduction in audio quality. The trick behind MP3 is eliminating sounds that the human ear cannot perceive. The human hearing range is between 20Hz to 20Khz, and it is most sensitive between 2 and 4 KHz. When sound is compressed into an MP3 file, an attempt is made to get rid of the frequencies that cannot be heard.
> 
> For example:
> 
> • There are certain sounds that the human ear cannot hear.
> 
> • There are certain sounds that the human ear perceives much better than others.
> 
> • If there are two sounds playing simultaneously, we hear the louder one but cannot hear the softer one.
> 
> • Using facts like these, voices shrink considerably by a factor of 10 to 12 at least.

[![image](/assets/img/wordpress/2012/07/image11.png "image")](/assets/img/wordpress/2012/07/image11.png)

> ### 3.3.2. OGG VORBIS
> 
> Ogg Vorbis is a high-compression, lossy algorithm for encoding audio content. It is a general-purpose compressed audio. This places Vorbis in the same competitive class as audio representations such as MPEG-4 (AAC), and similar to, but higher performance than MPEG-1/2 audio layer 3, MPEG-4 audio (TwinVQ), WMA, and PAC. Vorbis-encoded audio can be used both for soundtracks and general-purpose sound effects. Static buffers are only decoded once at load time, making their use practical for just about any audio source in a game.


### 3.4. Three-Dimensional Audio

3D audio – to use its proper name, “positional 3D audio” – is the latest technology designed to render sound in the entire audio field. Positional 3D audio plots a sound’s velocity and trajectory in full three-dimensional space.

Effects that are difficult or impossible to accomplish with simple stereo output can be achieved with 3D audio. For example, panning is no longer restricted to moving from side to side in a two-speaker system, and sounds can now go up, down, or literally anywhere in the three-dimensional auditory space. Imagine that you are listening to an orchestra playing in a symphony hall. If you close your eyes, you should be able to hear the sound of the basses coming from the back left corner of the stage and the trumpets from the middle right. 3D audio replicates this sound stage. With the appropriate soundcard and sound system, 3D audio presents some very exciting sonic possibilities.

A game could include aural cues to alert players to the presence of an invisible opponent coming from the left rear corner; a composer might experiment with a sound spiraling towards the listener in a slowly tightening loop. Alternatively, the movement of images in an animation may be coordinated with sounds in unusual ways, such as a reverse Doppler effect with the sound decreasing in intensity and frequency as it nears the listener and reversing the effect as it leaves.


### 3.5. Interactive Game Audio

In a movie the composer knows exactly when and where certain events are going to happen. A film is a linear medium, experienced from start to finish upon each viewing and never changing. In games, the composer has limited knowledge of when or where events and actions will happen because games are interactive in real-time. It is a different way of thinking about music and flow, and must be accommodated. Otherwise, you can end up in an endless scene with a looping background track that easily becomes monotonous and boring. An interactive audio system allows the audio artist, the composer, to construct a compelling soundtrack that will adapt and change in response to the player’s actions in real-time and in an appropriate way for the current game situation.

* * *


### 4. Networks


### 4.1. Introduction

Multi-player games are games played by two or more people on a network. Each player controls one or more game objects, and the effect of this action has to be replicated to all other players. Multi-player problems:

- Delay: The communication delay affects the game playability.
- Reliability: A major problem is the reliability of the communication.

In any multi-player game, the main goal is to have a reliable transfer with a minimum amount of information required to maintain playability.


### 4.2. Implementation of Multi-Player Games

Multi-player games can be implemented by the application setting up and sending the messages, or more commonly by using an API such as DirectPlay, which does this automatically. Such an application acts as an interface between the game application and the Internet, handling the transmission and reception of messages and the player management. The main modes used for managing multi-player games are peer-to-peer and client-server.

> ### 4.2.1. Peer-to-Peer
> 
> Peer-to-peer mode requires no server application to be developed. An application embedded in the game itself handles communication, and each player maintains his or her own copy of the game database. This solves the potential problem of a server bottleneck. If there are n players in the game, then a single change made by one player needs to be communicated to the other (n – 1) players. If all players make changes–the usual situation at any time during a game–then n(n-1) messages need to be sent.

[![image](/assets/img/wordpress/2012/07/image12.png "image")](/assets/img/wordpress/2012/07/image12.png)

> ### 4.2.2. Client-Server
> 
> A client-server system is also known as a logical star configuration. In a client-server configuration, the server collects messages from all players. Clients, or players, only send messages to, or receive messages from, the server. Clients request from the server:

| 

\* To request to join an existing game or start a new one.

\*  To start the game and begin to play.

\*  To exit the session.

\*  Server response:

\*  The server collects messages from the clients and issues acknowledgements.

\*  On receipt of an acknowledgement, the client applies the command contained in the message.

 | [![image](/assets/img/wordpress/2012/07/image13.png "image")](/assets/img/wordpress/2012/07/image13.png) |

> In multi-player games, new technologies are adding excitement and amusement because players can see (using web cams) and talk (using voice-over IP) to each other during game play.

> ### 4.2.2.1. Web Cam
> 
> A web cam is camera that is attached to the computer. It captures images and makes them available to any other player. The web cam application continues to capture images over time while refreshing the image. Therefore, it broadcasts a real-time movie.
> 
> ### 4.2.2.2. Voice-Over IP (VoIP)
> 
> VoIP technology converts spoken words from a microphone into digital packets that travel over the network. Then, it converts back at the other end so players can speak to each other.

