from datetime import datetime,timedelta

time = "2022-12-22T16:50:00" # Replace with whatever you want
date = datetime.strptime(time, '%Y-%m-%dT%H:%M:%S')
print(date)
now = datetime.now()-timedelta(minutes=1) # You can even find the current date and time using this expression
print(now)
if date < now:
    print('past')
elif date > now:
    print('future')
else:
    print('present')