<template>
  <div>
    <div class="loadingio-spinner-ellipsis-adq3ekjegwi">
      <div class="ldio-e3wxfug6afa">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>

    <div class="meter">
      <span style="width:100%;">
        <span class="progress"></span>
      </span>
    </div>
  </div>
</template>
<script>
export default { name: 'Loading' };
</script>

<style scoped>
@keyframes ldio-e3wxfug6afa {
  0% {
    transform: translate(6.0600000000000005px, 40.4px) scale(0);
  }
  25% {
    transform: translate(6.0600000000000005px, 40.4px) scale(0);
  }
  50% {
    transform: translate(6.0600000000000005px, 40.4px) scale(1);
  }
  75% {
    transform: translate(40.4px, 40.4px) scale(1);
  }
  100% {
    transform: translate(74.74px, 40.4px) scale(1);
  }
}
@keyframes ldio-e3wxfug6afa-r {
  0% {
    transform: translate(74.74px, 40.4px) scale(1);
  }
  100% {
    transform: translate(74.74px, 40.4px) scale(0);
  }
}
@keyframes ldio-e3wxfug6afa-c {
  0% {
    background: #290908;
  }
  25% {
    background: #c24229;
  }
  50% {
    background: #831a19;
  }
  75% {
    background: #491212;
  }
  100% {
    background: #290908;
  }
}
.ldio-e3wxfug6afa div {
  position: absolute;
  width: 20.2px;
  height: 20.2px;
  border-radius: 50%;
  transform: translate(40.4px, 40.4px) scale(1);
  background: #290908;
  animation: ldio-e3wxfug6afa 1s infinite cubic-bezier(0, 0.5, 0.5, 1);
}
.ldio-e3wxfug6afa div:nth-child(1) {
  background: #491212;
  transform: translate(74.74px, 40.4px) scale(1);
  animation: ldio-e3wxfug6afa-r 0.25s infinite cubic-bezier(0, 0.5, 0.5, 1),
    ldio-e3wxfug6afa-c 1s infinite step-start;
}
.ldio-e3wxfug6afa div:nth-child(2) {
  animation-delay: -0.25s;
  background: #290908;
}
.ldio-e3wxfug6afa div:nth-child(3) {
  animation-delay: -0.5s;
  background: #491212;
}
.ldio-e3wxfug6afa div:nth-child(4) {
  animation-delay: -0.75s;
  background: #831a19;
}
.ldio-e3wxfug6afa div:nth-child(5) {
  animation-delay: -1s;
  background: #c24229;
}
.loadingio-spinner-ellipsis-adq3ekjegwi {
  width: 101px;
  height: 101px;
  display: inline-block;
  overflow: hidden;
  background: #ffffff;
}
.ldio-e3wxfug6afa {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-e3wxfug6afa div {
  box-sizing: content-box;
}
/* generated by https://loading.io/ */

.meter {
  height: 5px;
  position: relative;
  background: #f3efe6;
  overflow: hidden;
}

.meter span {
  display: block;
  height: 100%;
}

.progress {
  background-color: #e4c465;
  -webkit-animation: progressBar 5s ease-in-out;
  -webkit-animation-fill-mode: both;
  -moz-animation: progressBar 5s ease-in-out;
  -moz-animation-fill-mode: both;
}

@-webkit-keyframes progressBar {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}

@-moz-keyframes progressBar {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
h1 {
  color: cornflowerblue;
}
</style>
