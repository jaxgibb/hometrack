Submitted by Jax for Hometrack.

Frighteningly, I used to set a similar code exercise for all potential employees, on the basis that if they couldn't follow instructions & get some code over the line without me staring at them, then there was probably something wrong that I couldn't fix with training.

I made a few assumptions & executive decisions with the implementation:
* if one of the entries is missing a required field, then the whole request is invalid
* if an address field is missing, then it is simply not included in the result - as opposed, the address is invalid.
* only the "interesting" fields are concatenated - I dropped off lat & long.

This is currently deployed as 

https://still-lowlands-4973.herokuapp.com/
