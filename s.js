

function handlePomodoroControlButtonPress() {
    if (pomodoro.isPaused) {
        pomodoro.intervals.push([new Date]);
    } else {
        pomodoro.intervals[pomodoro.intervals.length - 1].push(new Date);
    }
    pomodoro.isPaused = !pomodoro.isPaused;
}

function resetPomodoroTimer() {
    clearInterval(pomodoro.timer);
    pomodoro.task = null;
    pomodoro.isPaused = true;
    pomodoro.intervals = [];
};

function showMessageTimeIsOver() {
    window.navigator.vibrate([200,30,200,30,200]);
    alert('Time is over!');
}



function getTimeTheRest() {
    var diff = 0;
    if (pomodoro.intervals.length) {
        for (var i = 0; i < pomodoro.intervals.length; i++) {
            if (pomodoro.intervals[i].length == 2) {
                diff += pomodoro.intervals[i][1] - pomodoro.intervals[i][0];
            } else if (pomodoro.intervals[i].length == 1) {
                diff += new Date() - pomodoro.intervals[i][0];
            }
            
        }
    }
    var timeTheRest = pomodoro.timeAwait - diff;
    return timeTheRest;
}


function renderTimerText(timeTheRest) {
    
    var diffDate =  new Date(timeTheRest);
    
    var minutes = withLeadingZero(diffDate.getUTCMinutes());
    var seconds = withLeadingZero(diffDate.getUTCSeconds());
    
    var newText = minutes + ':' + seconds;
    
    if (pomodoro.text != newText) {
        pomodoro.text = newText;
        timer.innerHTML = pomodoro.text;
    }
    
}



counter.isRun = false;
counter.isPaused = true;
counter.intervals = [];
counter.timer = {};
counter.text = '';


startpauseCounter.addEventListener('click', function() {
    
    if (!counter.isRun) {
        counter.isRun = true;
        counter.timer = setInterval(function() {
            renderCounterText();
        }, 100);
    }
    if (counter.isPaused) {
        counter.intervals.push([new Date]);
    } else {
        counter.intervals[counter.intervals.length - 1].push(new Date);
    }
    counter.isPaused = !counter.isPaused;
    renewStopCounterButton();
});


resetCounter.addEventListener('click', function() {
    if (counter.isRun) {
        counter.isRun = false;
        counter.isPaused = true;
        counter.intervals = [];
        clearInterval(counter.timer);
        renewStopCounterButton();
        renderCounterText();
    }
    
});

document.addEventListener('DOMContentLoaded', function() {
    renewStopCounterButton();
    renderCounterText();
});

function renewStopCounterButton() {
    if (counter.isPaused) {
        startpauseCounter.classList.remove('start-is-active');
        startpauseCounter.classList.add('pause-is-active');
    } else {
        startpauseCounter.classList.remove('pause-is-active');
        startpauseCounter.classList.add('start-is-active');
    }
}


function renderCounterText() {
    
    var diff = 0;
    if (counter.intervals.length) {
        for (var i = 0; i < counter.intervals.length; i++) {
            if (counter.intervals[i].length == 2) {
                diff += counter.intervals[i][1] - counter.intervals[i][0];
            } else if (counter.intervals[i].length == 1) {
                diff += new Date() - counter.intervals[i][0];
            }
            
        }
    }
    
    var diffDate = new Date(diff);
    
    var hours = withLeadingZero(diffDate.getUTCHours());
        
    var minutes = withLeadingZero(diffDate.getUTCMinutes());
    var seconds = withLeadingZero(diffDate.getUTCSeconds());
    
    var newText = hours + ':' + minutes + ':' + seconds;
    
    if (counter.text != newText) {
        counter.text = newText;
        counter.innerHTML = counter.text;
    }
    
}

function withLeadingZero(val) {
    val += '';
    if (val.length == 1) {
        val = '0' + val;
    }
    return val;
}
// Example code to dynamically update the news
// Replace this code with your actual news updating logic
//code for flash news
const newsItems = [
    'JAVA',
    'Data Structures & Algorithims',
    'Python Programming',
    'Web Development',
    'Leetcode Solving',
    'Semester Revision',
    'Microsoft Certifications',
    'Internship Project' 
  ];
  
  function updateNews() {
    const flashNewsElement = document.getElementById('flash-news');
    flashNewsElement.innerHTML = '';
  
    newsItems.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      flashNewsElement.appendChild(li);
    });
  }
  
  // Call the updateNews function periodically to update the news
  // For example, call it every 5 seconds
  setInterval(updateNews, 5000);
  