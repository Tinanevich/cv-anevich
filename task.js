function nthFibo(n) {
    return (n <= 2) ? n - 1 : nthFibo(n-1) + nthFibo(n-2);
}

console.log(nthFibo(4))