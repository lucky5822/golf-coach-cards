# GolfCoach Cards

Complete set of 9 cards for Nova GolfCoach integration.

## Cards Available
1. **Raw Launch Data** - Raw sensor data
2. **Derived Ball Flight** - Calculated flight metrics
3. **Shot Classification** - Shot type and quality
4. **Tour Benchmarks** - PGA/LPGA comparisons
5. **Shot Quality** - Detailed quality analysis
6. **Club Delivery** - Club impact metrics
7. **Trajectory** - Ball trajectory data
8. **Optimal Windows** - Optimal parameter windows
9. **Benchmarks** - Complete benchmark comparisons

## Installation
1. Install via HACS
2. Restart Home Assistant
3. Add cards in Lovelace editor

## Manual Configuration
Use in YAML mode:
```yaml
type: 'custom:nova-raw-launch-data-card'
title: 'My Golf Data'