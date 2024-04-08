(async () => {
  console.log(`Test start at ${new Date().toTimeString()}`);

  for (let i = 0; i < 10; i++) {
    console.log(`Test ${i}`);
    for (let j = 0; j < 1000000000; j++) {
      // do nothing
    }
  }

  console.log(`Test end at ${new Date().toTimeString()}`);
})();
