import React, { Component } from 'react';

class Details extends Component {

    Switcherr = () => {
        return (
            <div className='row bg-info m-0 p-2'>
                <div className='col-3  card me-1 bg-light '>
                    The Fibonacci sequence, in which each number is the sum of the two preceding ones. The sequence
                    commonly starts from 0 and 1
                </div>
                <div className='col-3  card me-1 bg-light '>
                    N = Nth fibonacchi Number
                </div>
                <div className='col-3  card me-1 bg-light'>
                    Fib(0) = 0 <br />
                    Fib(1) = 1 <br />
                    Fib(n) = Fib(n-1) + Fib(n-2)
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.Switcherr()}
            </div>
        );
    }
}

export default Details;
