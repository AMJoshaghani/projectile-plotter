import matplotlib.pyplot as plt
import numpy as np
import sys

d = lambda v: list(map(float, eval(v)))
xpoints = np.array(d(sys.argv[1]))
ypoints = np.array(d(sys.argv[2]))

ax = plt.gca()
ax.set_aspect('equal', adjustable='box')

plt.plot(xpoints, ypoints)
plt.show()