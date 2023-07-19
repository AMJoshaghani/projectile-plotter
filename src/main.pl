use warnings;
use strict;

use FindBin 1.51 qw($RealBin);
use lib "$RealBin/../lib";


unless ( caller ) {
	use Run;

	print ( "Please provide angle and initial velocity line by line:\n" );	
	my $angle = <>;
	my $v_init = <>;
	chomp $angle;
	chomp $v_init;
	
	my $r = Run->new($angle, $v_init);
	$r->run();
}