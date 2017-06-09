const TestSuite = require('./test-suite')

/**
 * The test runner class.
 *
 * Events:
 *   - `start`  execution started
 *   - `end`  execution complete
 *   - `suite`  (suite) test suite execution started
 *   - `suite end`  (suite) all tests (and sub-suites) have finished
 *   - `test`  (test) test execution started
 *   - `test end`  (test) test completed
 *   - `hook`  (hook) hook execution started
 *   - `hook end`  (hook) hook complete
 *   - `pass`  (test) test passed
 *   - `fail`  (test, err) test failed
 *   - `pending`  (test) test pending
 */
class TestRunner extends TestSuite {
  constructor () {
    super('root', false, null)

    this.timeoutDuration = 2000
    this.currentSuite = this
    this.runningNode = null
  }

  /**
   * Returns the current suite.
   * @return {TestSuite}
   */
  getCurrentSuite () {
    return this.currentSuite
  }

  /**
   * Sets the current suite of the runner.
   * @param {TestSuite}
   */
  setCurrentSuite (suite) {
    this.currentSuite = suite
  }

  getCurrentNode () {
    return this.getRunningNode() || this.getCurrentSuite()
  }

  /**
   * Sets the currently running node.
   * @param {TestRunnableNode} test The runnable node
   */
  setRunningNode (runnable) {
    this.runningNode = runnable
  }

  /**
   * Gets the currently running test case.
   * @return {TestRunnableNode}
   */
  getRunningNode () {
    return this.runningNode
  }

  /**
   * Runs the tests. Private API.
   * @return {Promise}
   */
  run () {
    this.total = this.getTotal()
    this.bubbleEvent('start')
    return super.run()
      .then(() => this.bubbleEvent('end'))
  }
}

module.exports = TestRunner
