# Performance Test Plan: Petstore API Lifecycle

## 1. Executive Summary
This document outlines the strategy, methodology, and acceptance criteria for the performance testing of the Petstore API. The objective is to ensure the system handles concurrent user traffic while maintaining high stability, low latency, and data integrity across the full CRUD lifecycle of pet management.

## 2. Objectives
*   **Determine Baseline Performance**: Establish response time benchmarks under normal load.
*   **Validate Scalability**: Verify system behavior during high-traffic spikes and stress conditions.
*   **Ensure Stability**: Confirm the system can maintain prolonged load without memory leaks or degradation (Soak testing).
*   **Automate Quality Gates**: Integrate performance checks into the CI/CD pipeline to prevent performance regressions.

## 3. Scope of Testing
The test suite focuses on the **End-to-End Pet Lifecycle**, simulating a real user workflow:
1.  **Create**: POST `/pet` (Add new pet with randomized data)
2.  **Read**: GET `/pet/{id}` (Retrieve the specific pet)
3.  **Update**: PUT `/pet` (Modify pet attributes)
4.  **Delete**: DELETE `/pet/{id}` (Cleanup/Remove the pet)

## 4. Test Methodology & Tooling
*   **Tooling**: [Grafana k6](https://k6.io/) (Open-source load testing tool).
*   **Language**: TypeScript for type-safe, maintainable test scripts.
*   **Architecture**:
    *   **Modular Requests**: Decoupled API calls from test logic for reusability.
    *   **Action Wrappers**: Integrated validation checks inside request functions.
    *   **Think Time**: Simulated realistic user behavior with randomized pacing (`1s - 3s`).

## 5. Load Profiles (Execution Strategy)
We utilize standardized profiles to test different disaster and usage scenarios:

| Profile | Purpose | Description |
| :--- | :--- | :--- |
| **Smoke Test** | Logic Validation | 1 VU, 1 iteration. Used to verify script correctness. |
| **Average Load** | Baseline Performance | Consistent traffic to measure standard latency. |
| **Stress Test** | Capacity Limit | Ramping up VUs until the system breaks to find the upper limit. |
| **Spike Test** | Sudden Surge | Rapid increase in VUs to test system elasticity and recovery. |
| **Soak Test** | Reliability | Long-duration testing to identify memory leaks or buffer overflows. |

## 6. Data Management
To prevent misleading results from database or CDN caching, the framework uses:
*   **CSV Data Pool**: A pool of 10,000+ unique IDs loaded via `SharedArray` for memory efficiency.
*   **Faker.js Integration**: Dynamic generation of names, categories, and tags for every request payload to ensure every transaction is unique.

## 7. Acceptance Criteria (KPIs & Thresholds)
As per industry standards for high-performing modern web services, the following thresholds are enforced as "Quality Gates". If any metric fails, the build in the CI/CD pipeline will be marked as **Failed**.

### 7.1 Reliability Metrics
| Metric | Threshold | Definition |
| :--- | :--- | :--- |
| **Error Rate** (`http_req_failed`) | `< 1.0%` | The percentage of requests resulting in HTTP 4xx or 5xx errors. Professionals aim for nearly zero errors. |
| **Check Success** (`checks`) | `> 99.0%` | Validates business logic (e.g., verifying that the JSON body contains the correct ID). |
| **Lifecycle Success** (`lifecycle_success`) | `> 98.0%` | A custom metric ensuring the *full workflow* (Create -> Read -> Update -> Delete) completes without a single break. |

### 7.2 Latency Metrics (Performance SLAs)
| Metric | Threshold | Definition |
| :--- | :--- | :--- |
| **Global Latency (p95)** | `< 500ms` | 95% of all requests must complete in under 500ms. This is the industry gold standard for "fast" APIs. |
| **Tail Latency (p99)** | `< 1000ms` | Ensures the slowest 1% of users still experience acceptable performance (under 1s). |
| **TTFB (Time to First Byte)** | `< 200ms` | Measures server processing speed. Excludes network transit time for the payload. |

### 7.3 Infrastructure & Security
| Metric | Threshold | Definition |
| :--- | :--- | :--- |
| **TLS Handshaking** | `< 150ms` | Measures the time to establish a secure SSL/TLS connection. High values indicate Load Balancer overhead. |

## 8. Execution & Reporting Pipeline
*   **Local Execution**: Developers run tests locally for debugging with automated HTML summaries.
*   **Cloud Execution**: Distributed runs on **k6 Cloud** to simulate 1M+ VUs without infrastructure overhead.
*   **CI/CD Integration**: Integrated with **GitHub Actions**. Tests run on every Pull Request or on a schedule.
*   **Artifacts**: Detailed HTML reports and cloud dashboards are saved for historical trend analysis.

---
**Approved By:** ____________________  
**Date:** 2026-01-05
