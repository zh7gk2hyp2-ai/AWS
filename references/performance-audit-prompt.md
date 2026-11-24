Act as a Principal Software Architect and Performance Engineer.

Your task is to perform a comprehensive performance audit and refactor of this entire codebase.

Before making any changes:

1. Thoroughly analyze the architecture, code structure, dependencies, database access patterns, caching strategy, queues, API endpoints, background jobs, asset loading, and deployment configuration.

2. Identify all performance bottlenecks, including but not limited to:
   - N+1 database queries
   - Missing or ineffective indexes
   - Inefficient SQL queries
   - Excessive memory allocations
   - Unnecessary object creation
   - Duplicate computations
   - Blocking I/O operations
   - Excessive network requests
   - Large payloads
   - Inefficient loops and algorithms
   - Slow API endpoints
   - Cache misses and poor cache utilization
   - Queue bottlenecks
   - Expensive model relationships
   - Over-fetching data
   - Asset and frontend performance issues

3. Produce a detailed PERFORMANCE_AUDIT.md containing:
   - Identified bottlenecks
   - Estimated impact
   - Root cause analysis
   - Recommended fixes
   - Risk assessment
   - Expected performance gains

4. Prioritize optimizations by ROI:
   - High impact / low risk first
   - High impact / medium risk second
   - Everything else afterward

When implementing improvements:

- Preserve all existing functionality.
- Do not introduce breaking changes unless absolutely necessary.
- Maintain readability and maintainability.
- Follow existing project conventions.
- Add or update tests when required.
- Avoid premature optimization.

For every significant change, explain:
- What was changed
- Why it was changed
- Expected impact on:
  - Response time
  - Throughput
  - Memory usage
  - Database load
  - Infrastructure cost

Specific areas to investigate deeply:

### Database
- Query plans
- Index usage
- Composite indexes
- Eager loading opportunities
- Pagination strategy
- Aggregate queries
- Bulk operations

### Application Layer
- Service architecture
- Object lifecycle
- Dependency resolution
- Serialization costs
- Validation overhead
- Event/listener performance

### Caching
- Query caching
- Response caching
- Redis utilization
- Cache invalidation strategy

### Queues & Background Processing
- Long-running jobs
- Retry policies
- Batch processing opportunities
- Queue throughput

### API Performance
- Payload size reduction
- Serialization optimization
- Endpoint response times
- HTTP caching opportunities

### Frontend (if applicable)
- Bundle size
- Lazy loading
- Asset optimization
- Render performance

### Infrastructure
- Runtime configuration
- Connection pooling
- Worker configuration
- Container optimization

Execution Strategy:

1. Audit
2. Create plan
3. Present findings
4. Implement highest-impact improvements
5. Re-measure
6. Continue iteratively

Do not start refactoring immediately.

First create PERFORMANCE_AUDIT.md and PERFORMANCE_PLAN.md, then wait for approval before making changes.