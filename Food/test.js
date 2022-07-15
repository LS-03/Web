function primeFactors(n){
  let dict = {};
  let res = "";
  for(let i = 2; i < n/2; i++) {
    while(n % i == 0) { 
      dict[i] = dict[i] ? dict[i]+1 : 1;
      n = n / i;
    }
  }
  let nums = Object.getOwnPropertyNames(dict);
  nums.forEach(i => {
    if(dict[i] == 1) res += `(${i})`;
    else res += `(${i}**${dict[i]})`;
  });
}
