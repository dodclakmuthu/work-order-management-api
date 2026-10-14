## Auth requirements
# Who can log in?
    Client - can self register
    Technician - can't self register, Manager or admin can only create
    Manager - can't self register, admin can only create
    Admin - create using CLI


| Action                | Client | Technician | Manager     | Owner |
| --------------------- | -----: | ---------: | ------:     | ----: |
| Create work order     |      ✅ |       ❌ |       ✅    |     ✅ |
| View own work orders  |      ✅ |         — |      ✅     |     ✅ |
| Assign technician     |      ❌ |       ❌ |       ✅     |     ✅ |
| Start assigned job    |      ❌ |       ✅ |       ❌     |     ✅ |
| Complete assigned job |      ❌ |       ✅ |       ❌     |     ✅ |


*** assume that we only have one single tenent org only, later we need to add multiple organizations