/*

  @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800&family=Play:wght@700&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --black-gradient: linear-gradient(
    144.39deg,
    #ffffff -278.56%,
    #6d6d6d -78.47%,
    #11101d 91.61%
  );
  --card-shadow: 0px 20px 100px -10px rgba(66, 71, 91, 0.1);
}

* {
  scroll-behavior: smooth;
}

.text-gradient {
  background: radial-gradient(
    64.18% 64.18% at 71.16% 35.69%,
    #def9fa 0.89%,
    #bef3f5 17.23%,
    #9dedf0 42.04%,
    #7de7eb 55.12%,
    #5ce1e6 71.54%,
    #33bbcf 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}

.bg-blue-gradient {
  background: linear-gradient(
    157.81deg,
    #def9fa -43.27%,
    #bef3f5 -21.24%,
    #9dedf0 12.19%,
    #7de7eb 29.82%,
    #5ce1e6 51.94%,
    #33bbcf 90.29%
  );
}

.bg-black-gradient {
  background: linear-gradient(
    144.39deg,
    #ffffff -278.56%,
    #6d6d6d -78.47%,
    #11101d 91.61%
  );
}

.bg-black-gradient-2 {
  background: linear-gradient(
    -168.39deg,
    #ffffff -278.56%,
    #6d6d6d -78.47%,
    #11101d 91.61%
  );
}

.bg-gray-gradient {
  background: linear-gradient(
    153.47deg,
    rgba(255, 255, 255, 0) -341.94%,
    #14101d 95.11%
  );
}

.bg-discount-gradient {
  background: linear-gradient(125.17deg, #272727 0%, #11101d 100%);
}
.bg-orange-gradient {
  background: linear-gradient(
    144.39deg,
    #FFA500,
    #FF6347, 
    #FFD700
  );
}


.box-shadow {
  box-shadow: 0px 20px 100px -10px rgba(66, 71, 91, 0.1);
}


.sidebar {
  -webkit-animation: slide-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@-webkit-keyframes slide-top {
  0% {
    -webkit-transform: translateY(100px);
    transform: translateY(100px);
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}

@keyframes slide-top {
  0% {
    -webkit-transform: translateY(100px);
    transform: translateY(100px);
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}

.feature-card:hover {
  background: var(--black-gradient);
  box-shadow: var(--card-shadow);
}

.feedback-container .feedback-card:last-child {
  margin-right: 0px;
}

.feedback-card {
  background: transparent;
}

.feedback-card:hover {
  background: var(--black-gradient);
}

.blue__gradient {
  background: linear-gradient(180deg, rgba(188, 165, 255, 0) 0%, #214d76 100%);
  filter: blur(123px);
}

.pink__gradient {
  background: linear-gradient(90deg, #f4c4f3 0%, #fc67fa 100%);
  filter: blur(900px);
}

.white__gradient {
  background: rgba(255, 255, 255, 0.6);
  filter: blur(750px);
}


body {

  background: linear-gradient(90deg, #FFE4B5 0%, hsl(35, 100%, 90%) 100%);

}

input:focus {
  outline: none; 
  border-color: #FFB37E;
  background-color: #fdefe5;
  
  
}
input[type='checkbox'] {
  accent-color: #F4802E;

  
}
button {
 


  background-color: #F4802E; 
  color: #ffffff; 
  border: none; 
  
}


@layer base {
  html {
    @apply font-Montserrat;
  }

  h1 {
    @apply text-xl font-medium capitalize;
  }
}
.link {
  @apply p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium;
}

.active {
  @apply bg-blue-100 text-blue-600;
}

*/