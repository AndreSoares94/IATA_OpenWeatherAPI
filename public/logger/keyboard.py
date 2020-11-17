import time
from pynput import keyboard
import calendar


# detect key press
def on_press(key):
    f = open("logger.JSON", "a")
    try:
        print('alphanumeric key {0} pressed'.format(key.char))
        value = '{0}'.format(key.char)
        timestamp = calendar.timegm(time.gmtime())
        f.write("{\"Timestamp\":" + str(timestamp) + "," + "\"Key\": \"" + value + '\"},\n')
    except:
        print('special key {0} pressed'.format(key))
        value = '{0}'.format(key)
        timestamp = calendar.timegm(time.gmtime())

        if key == keyboard.Key.esc:
            f.write("{\"Timestamp\":" + str(timestamp) + "," + "\"Key\":\"" + value + '\"}\n')
        else:
            f.write("{\"Timestamp\":" + str(timestamp) + "," + "\"Key\":\"" + value + '\"},\n')
    f.close()


# detect key releases
def on_release(key):
    print('{0} released'.format(key))

    if key == keyboard.Key.esc:
        # Stop Listener
        print('Stop')
        return False


def js(s):
    f = open("logger.JSON", "a")
    f.write(s)
    f.close()


# Collect events
js("[")
with keyboard.Listener(
        on_press=on_press,
        on_release=on_release) as listener:
    listener.join()
js("]")
